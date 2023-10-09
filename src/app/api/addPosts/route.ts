import {NextResponse} from "next/server";
import prisma from "../../../../libs/prisma";
import {addPostSchema} from "../../../../libs/types";
import {revalidatePath, revalidateTag} from "next/cache";

export async function POST(req: Request) {
    let post = null;
    const body = await req.json();
    const {username, title, content} = body;
    const validation = addPostSchema.safeParse(body);
    let zodErrors = {};
    if (!validation.success) {
        validation.error.issues.forEach((issue) => {
            zodErrors = {...zodErrors, [issue.path[0]]: issue.message};
        })
    }
    if (validation.success) {
        post = await prisma.post.create({
            data: {
                title,
                content,
                published: true,
                author: {
                    create: {
                        name: username
                    }
                }
            }
        })
        revalidatePath("/")
        revalidateTag("post")
    }
    return NextResponse.json(Object.keys(zodErrors).length > 0 ? { errors: zodErrors} : { success: true, data: post })
}