import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";

const createProduct = async (data: any) => {
  const result = await prisma.product.create({ data });
  return result;
};



const getAllProducts = async (query: ProductQuery) => {
  const page = query.page ? Number(query.page) : 1;
  const limit = query.limit ? Number(query.limit) : 10;
  const skip = (page - 1) * limit;


  const filters: any = {};
  if (query.search) {
    filters.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { category: { contains: query.search, mode: "insensitive" } },
    ];
  }

  const products = await prisma.product.findMany({
    where: filters,
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const total = await prisma.product.count({ where: filters });

  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    data: products,
  };
};


const getSingleProduct = async (id: string) => {
  const result = await prisma.product.findUnique({ where: { id } });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found..!!");
  }
  return result;
};

const updateProduct = async (id: string, data: any) => {
  const existingProduct = await prisma.product.findUnique({ where: { id } });
  if (!existingProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found..!!");
  }
  const result = await prisma.product.update({ where: { id }, data });
  return result;
};

const deleteProduct = async (id: string) => {
  const existingProduct = await prisma.product.findUnique({ where: { id } });
  if (!existingProduct) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found..!!");
  }
  await prisma.product.delete({ where: { id } });
  return null;
};

export const productService = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
