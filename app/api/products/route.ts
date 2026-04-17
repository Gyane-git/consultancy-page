import { NextResponse } from "next/server";
import getPool from "@/lib/db";

// GET - Fetch all products
export async function GET() {
  try {
    const pool = getPool();
    const [rows] = await pool.query(`
      SELECT p.*, c.name as categoryName 
      FROM Product p 
      LEFT JOIN Category c ON p.categoryId = c.id 
      ORDER BY p.createdAt DESC
    `);
    return NextResponse.json({ success: true, products: rows });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST - Create new product
export async function POST(request: Request) {
  try {
    const pool = getPool();
    const formData = await request.formData();
    
    const productCode = formData.get("productCode") as string;
    const productName = formData.get("productName") as string;
    const categoryId = formData.get("category_id") ? parseInt(formData.get("category_id") as string) : null;
    const brand = formData.get("brand") as string || null;
    const deliveryTargetDays = formData.get("deliveryTargetDays") ? parseInt(formData.get("deliveryTargetDays") as string) : null;
    const weeklyProduct = formData.get("weeklyProduct") === "true" ? true : false;
    const flashSaleProduct = formData.get("flashSaleProduct") === "true" ? true : false;
    const todayDeals = formData.get("todayDeals") === "true" ? true : false;
    const specialProduct = formData.get("specialProduct") === "true" ? true : false;
    const actualPrice = formData.get("actualPrice") ? parseFloat(formData.get("actualPrice") as string) : null;
    const sellingPrice = formData.get("sellingPrice") ? parseFloat(formData.get("sellingPrice") as string) : null;
    const availableQuantity = formData.get("availableQuantity") ? parseInt(formData.get("availableQuantity") as string) : null;
    const stockQuantity = formData.get("stockQuantity") ? parseInt(formData.get("stockQuantity") as string) : null;
    const productDescription = formData.get("productDescription") as string || null;
    const keySpecifications = formData.get("keySpecifications") as string || null;
    const packaging = formData.get("packaging") as string || null;
    const warranty = formData.get("warranty") as string || null;

    const [result] = await pool.query(
      `INSERT INTO Product (productCode, productName, categoryId, brand, deliveryTargetDays, 
        weeklyProduct, flashSaleProduct, todayDeals, specialProduct, actualPrice, sellingPrice,
        availableQuantity, stockQuantity, productDescription, keySpecifications, packaging, warranty, isActive)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, true)`,
      [productCode, productName, categoryId, brand, deliveryTargetDays, weeklyProduct, flashSaleProduct, 
       todayDeals, specialProduct, actualPrice, sellingPrice, availableQuantity, stockQuantity,
       productDescription, keySpecifications, packaging, warranty]
    );

    const [inserted] = await pool.query("SELECT * FROM Product WHERE id = ?", [(result as any).insertId]);
    
    return NextResponse.json({ success: true, product: (inserted as any[])[0] });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 });
  }
}