import { NextResponse } from "next/server.js";
import prisma from "@/utils/prisma.js";
import { uploadFile } from "@/lib/uploadFile.js";
import slugify from "slugify";

export async function GET(request) {
  try {
    const allProducts = await prisma.product.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
          },
        },
      },
    });
    return NextResponse.json({
      data: allProducts,
      message: "All products fetched successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Error fetching products",
    });
  }
}

export async function POST(request) {
  const formData = await request.formData();
  const name = formData.get("name");
  const price = formData.get("price");
  const description = formData.get("description");
  const featuredImage = formData.get("featuredImage");
  const images = formData.getAll("images");
  const category = formData.get("category");
  const userId = formData.get("userId");

  let productId = "";

  try {
    //save product ke database
    const allImages = [];
    images.forEach((image) => {
      allImages.push(image.name);
    });

    const createProduct = await prisma.product.create({
      data: {
        name,
        slug: slugify(name, { lower: true, replacement: "-" }),
        description,
        price: Number(price),
        category,
        featuredImage: featuredImage.name,
        images: allImages,
        userId: userId,
      },
    });

    productId = createProduct.id;

    //send image ke s3
    await uploadFile(featuredImage, productId);

    for (let i = 0; i < images.length; i++) {
      await uploadFile(images[i], productId);
    }

    return NextResponse.json({
      data: createProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Error create products",
    });
  }
}
