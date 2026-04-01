/*
Author : Sofian Hussein
Date : 01.04.2026
Title : adminService.js
Desc : Business logic for auth
*/
import {getAllOrdersRepository} from "../repositories/adminRepository.js";

export async function getAllOrdersService() {
    return await getAllOrdersRepository()
}