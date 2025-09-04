import { NextRequest, NextResponse } from 'next/server';
import Papa from 'papaparse';
import { Product } from '@/types';

// Extract valid image URLs/paths from a potentially messy CSV field
function extractImagePaths(input?: string): string[] {
  if (!input) return [];

  // Match absolute URLs or paths that end with a known image extension (case-insensitive)
  // Allows optional query strings
  const imagePattern = /(?:https?:\/\/[^\s"'()]+|\/?[A-Za-z0-9._\-\/]+)\.(?:png|jpe?g|gif|svg|webp)(?:\?[^\s"'()]*)?/gi;
  const matches = input.match(imagePattern) || [];

  // Normalize and de-duplicate while preserving order
  const seen = new Set<string>();
  const results: string[] = [];
  for (const match of matches) {
    let trimmed = match.trim();

    // Remove first section before "/" if it exists
    const slashIndex = trimmed.indexOf('/');
    if (slashIndex > 0) {
      trimmed = trimmed.substring(slashIndex + 1);
    }

    // Change extension to .avif
    trimmed = trimmed.replace(/\.[^.?#]+(\?.*)?$/, '.avif$1');

    if (!seen.has(trimmed)) {
      seen.add(trimmed);

      // Only keep the CDN URL version
      const url = `https://products.olislab.com/products/${trimmed}`;
      results.push(url);
    }
  }

  return results;
}

// Extract CDN image URLs from strings starting with "Product%"
function extractOlisProductAvifUrls(input?: string): string[] {
  if (!input) return [];

  // Find tokens that start with Product% and continue until whitespace/comma/quote
  const tokens = input.match(/Product%[^\s,"']+/g) || [];

  const results: string[] = [];
  const seen = new Set<string>();

  for (const token of tokens) {
    // Split by '/' and take the second part if available
    const parts = token.split('/');
    if (parts.length < 2) continue;
    let second = parts[1];

    // Strip query/hash if present
    second = second.split(/[?#]/)[0];

    // Ensure .avif extension (replace anything after first dot)
    if (second.includes('.')) {
      second = second.replace(/\.[^.]+$/, '.avif');
    } else {
      second = `${second}.avif`;
    }

    const url = `https://products.olislab.com/products/${second}`;
    if (!seen.has(url)) {
      seen.add(url);
      results.push(url);
    }
  }

  return results;
}

// Convert CSV data to our Product interface
function convertCSVToProduct(csvRow: Record<string, string>, index: number): Product {
  // Extract price number from string like "€24.00"
  const priceMatch = csvRow.Price?.match(/[\d.]+/);
  const price = priceMatch ? parseFloat(priceMatch[0]) : 0;

  // Extract rating number from string like "97"
  const rating = csvRow['Rating/100'] || '0';

  const brand = (csvRow.Brand?.split('(')[0].trim()) || 'Brand name';

  // Split skin types, categories, etc.
  const skinTypes = csvRow['Skin Types']?.split(',').map((s: string) => s.trim()) || [];
  const ingredients = csvRow.Ingredients?.split(',').map((s: string) => s.trim()) || [];

  // Prefer CDN-transformed images when available, else fall back to standard detected images
  const cdnImages = extractOlisProductAvifUrls(csvRow.Images);
  const extractedImages = extractImagePaths(csvRow.Images);
  const images = (cdnImages.length > 0 ? cdnImages : extractedImages).slice(0, 3);
  if (images.length === 0) {
    images.push('/follie.png', '/follie.png', '/follie.png');
  }

  return {
    id: `csv-${index + 1}`,
    brand: brand || 'Brand name', // fetched url from csv is not working
    name: csvRow.Name || 'Unknown Product',
    category: `${csvRow.Category || 'skincare'} • ${csvRow['Sub Category'] || 'product'}`,
    size: '50ml', // Default size since not in CSV
    price: price,
    rating: `${rating}/100`,
    description: csvRow.Description || '',
    images: images.slice(0, 3), // Take up to 3 images
    image: images[0] || '/follie.png',
    whyOliLovesIt: csvRow['Why Oli Loves It'] || '',
    howToUse: csvRow['How To Use'] || '',
    ingredients: ingredients.slice(0, 10), // Take first 10 ingredients
    skinRecommendation: `Perfect for ${skinTypes.join(', ').toLowerCase()} skin types.`,
    skinTypes: skinTypes,
    subcategories: csvRow['Sub Category']?.split(',').map((s: string) => s.trim()) || [],
    concerns: [], // Would need to be derived from description or other fields
    bundle: false // Default to false, could be determined by product type
  };
}

// GET /api/products
export async function GET(request: NextRequest) {
  try {
    // Add a small delay to demonstrate skeleton loading (remove in production)
    await new Promise(resolve => setTimeout(resolve, 1000));
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Fetch CSV from public folder
    const csvUrl = new URL('/products.csv', request.url);
    const response = await fetch(csvUrl.toString());

    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.status}`);
    }

    const csvText = await response.text();

    // Parse CSV using papaparse
    const parseResult = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim(),
      transform: (value: string) => value.trim()
    });

    if (parseResult.errors.length > 0) {
      console.warn('CSV parsing errors:', parseResult.errors);
    }

    const allProducts = parseResult.data.map((row, index) =>
      convertCSVToProduct(row as Record<string, string>, index)
    );

    // Apply pagination
    const products = allProducts.slice(offset, offset + limit);
    const hasMore = offset + limit < allProducts.length;
    const total = allProducts.length;

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        offset,
        limit,
        total,
        hasMore
      }
    });

  } catch (error) {
    console.error('Error loading products:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to load products',
        data: []
      },
      { status: 500 }
    );
  }
}

// GET /api/products/[id]
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // For single product, we could implement caching or direct lookup
    // For now, get all products and find the one
    const allProductsResponse = await GET(request);
    const allProductsData = await allProductsResponse.json();

    if (!allProductsData.success) {
      throw new Error('Failed to load products');
    }

    const product = allProductsData.data.find((p: Product) => p.id === id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('Error loading product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to load product' },
      { status: 500 }
    );
  }
}
