import Package from "../schema/package"

export const findAllPackages = async () => {
    return await Package.find()
                        .select({createdAt: 0});
}

export const findPackageById = async (id: string) => {
    return await Package.findById(id);
}