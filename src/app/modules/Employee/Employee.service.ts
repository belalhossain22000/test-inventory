import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiErrors";
import httpStatus from "http-status";
import * as bcrypt from "bcrypt";
import config from "../../../config";
import { EmployeeRole } from "@prisma/client";

const createEmployee = async (data: any) => {

  const isExistUser = await prisma.employee.findUnique({
    where: {
      name: data.name,
    },
  });

  if (isExistUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User already exist");
  }
  
  const hashedPassword: string = await bcrypt.hash(
    data.password,
    Number(config.bcrypt_salt_rounds)
  );

  data.password = hashedPassword;
  const result = await prisma.employee.create({ data });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create employee");
  }
  return result;
};

//create admin
const createAdmin = async (data: any) => {

  const isExistUser = await prisma.employee.findUnique({
    where: {
      name: data.name,
    },
  });

  if (isExistUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User already exist");
  }

  const hashedPassword: string = await bcrypt.hash(
    data.password,
    Number(config.bcrypt_salt_rounds)
  );
  data.password = hashedPassword;
  data.role = EmployeeRole.ADMIN;
  const result = await prisma.employee.create({ data });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create admin");
  }
  return result;
};

const getAllEmployees = async (query: Record<string, any>) => {
  const result = await prisma.employee.findMany();
  return result;
};

const getSingleEmployee = async (id: string) => {
  const result = await prisma.employee.findUnique({ where: { id } });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Employee not found..!!");
  }
  return result;
};

const updateEmployee = async (id: string, data: any) => {
  const existingEmployee = await prisma.employee.findUnique({ where: { id } });
  if (!existingEmployee) {
    throw new ApiError(httpStatus.NOT_FOUND, "Employee not found..!!");
  }
  const result = await prisma.employee.update({ where: { id }, data });
  return result;
};

const deleteEmployee = async (id: string) => {
  const existingEmployee = await prisma.employee.findUnique({ where: { id } });
  if (!existingEmployee) {
    throw new ApiError(httpStatus.NOT_FOUND, "Employee not found..!!");
  }
  await prisma.employee.delete({ where: { id } });
  return null;
};

export const employeeService = {
  createEmployee,
  createAdmin,
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
