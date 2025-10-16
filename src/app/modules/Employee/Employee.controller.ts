import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { employeeService } from "./Employee.service";

const createEmployee = catchAsync(async (req: Request, res: Response) => {
    const result = await employeeService.createEmployee(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Employee created successfully",
        data: result,
    });
});

//createAdmin
const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const result = await employeeService.createAdmin(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: "Admin created successfully",
        data: result,
    });
});

const getAllEmployees = catchAsync(async (req: Request, res: Response) => {
    const results = await employeeService.getAllEmployees(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Employees retrieved successfully",
        data: results,
    });
});

const getSingleEmployee = catchAsync(async (req: Request, res: Response) => {
    const result = await employeeService.getSingleEmployee(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Employee retrieved successfully",
        data: result,
    });
});

const updateEmployee = catchAsync(async (req: Request, res: Response) => {
    const result = await employeeService.updateEmployee(req.params.id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Employee updated successfully",
        data: result,
    });
});

const deleteEmployee = catchAsync(async (req: Request, res: Response) => {
    const result = await employeeService.deleteEmployee(req.params.id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Employee deleted successfully",
        data: result,
    });
});

export const employeeController = {
    createEmployee,
    createAdmin,
    getAllEmployees,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee,
};
