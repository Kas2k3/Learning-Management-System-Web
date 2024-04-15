const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
    try {
        await database.category.createMany({
            data: [
                { name: "Công nghệ thông tin và Truyền thông" },
                { name: "Điện tử viễn thông" },
                { name: "Cơ khí" },
                { name: "Kỹ thuật hóa học" },
                { name: "Toán ứng dụng và Tin học" },
                { name: "Kinh tế và quản lý" },
                { name: "Công nghệ sinh học" },
                { name: "Dệt may và da giày" },
            ]
        });

        console.log("Success");
    } catch (error) {
        console.log("Error seeding the database categories", error);
    } finally {
        await database.$disconnect();
    }
}

main();