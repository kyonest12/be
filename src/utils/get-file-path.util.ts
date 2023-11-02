export const getFilePath = (file: Express.Multer.File) => {
    return `${process.env.APP_URL}/files/${file.filename}`;
};
