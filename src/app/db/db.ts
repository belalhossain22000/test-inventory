import { EmployeeRole } from "@prisma/client";
import prisma from "../../shared/prisma";
import config from "../../config";
import * as bcrypt from "bcrypt";



export const initiateSuperAdmin = async () => {
  const payload: any = {
    name: "Admin",
    salary : 0,
    role: EmployeeRole.SUPER_ADMIN,
    password: "123456",
  };

   const hashedPassword: string = await bcrypt.hash(
     "12345678",
     Number(config.bcrypt_salt_rounds)
   );
  payload.password = hashedPassword;


  const isExistUser = await prisma.employee.findUnique({
    where: {
      name: payload.name,
    },
  });

  if (isExistUser) return;

  await prisma.employee.create({
    data: { ...payload },
  });
};
