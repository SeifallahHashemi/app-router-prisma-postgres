import {NextResponse} from "next/server";
import prisma from "../../../../../libs/prisma";

export async function DELETE(request: Request, { params }: { params: { id: string}}) {
    const {id} = params;
    await prisma.post.delete({
        where: {
            id,
        }
    })
    return NextResponse.json({message: "post deleted successfully"})
}