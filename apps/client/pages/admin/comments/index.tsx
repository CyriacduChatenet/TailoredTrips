import { GetServerSideProps, NextPage } from "next";
import { useMemo, useState } from "react";
import { AccessToken, User, Comment } from "@/../../packages/types/src";
import { CommentService, UserService } from "@/../../packages/services/src";
import { jwtDecode } from "@/../../packages/functions/src";
import { parse } from "cookie";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/../../packages/constants/src";

import { Layout } from "@/components/layout";
import { AuthChecker } from "@/components/auth/authChecker";
import { Paginator } from "@/components/paginator";
import { CommentTable } from "@/components/admin/comment-table";

interface IProps {
    data: {
        page: number;
        limit: number;
        total: number;
        data: Comment[];
    },
    user: User;
}

const AdminDashboardCommentsPage: NextPage<IProps> = ({ data, user }) => {
    const [page, setPage] = useState(1);
    const [response, setResponse] = useState<{
        page: number;
        limit: number;
        total: number;
        data: Comment[];
    }>(data);
    const router = useRouter();
    const error = {};

    const handleCreate = async () => {
        return router.push(ROUTES.ACTIVITY.CREATE)
    }

    const handleFetch = async () => {
        const res = await CommentService.findAllComments(`${process.env.NEXT_PUBLIC_API_URL}`, error, `?page=${page}&limit=10&sortedBy=DESC`);
        if (res) {
            setResponse(await res);
        }
    }

    useMemo(() => {
        if (page > 1) {
            handleFetch();
        }
    }, [page, user]);

    return (
        <AuthChecker>
            <Layout title={"About Us - Your Ultimate Travel Tailor for Tailored Adventures"} description={"Discover our innovative travel management platform that empowers you to curate personalized trips filled with activities based on your unique preferences. Explore the world like never before with our customizable journey planner."}>
                <main className="px-9 lg:px-32 min-h-screen grid grid-cols-4 md:grid-cols-8 xl:grid-cols-12 pt-20">
                    <section className="col-span-4 md:col-span-8 xl:col-span-12 pt-4 md:pt-8">
                        <h1 className="font-bold lg:text-2xl">Comments</h1>
                        <section className="my-8">
                            <br />
                            <br />
                            <CommentTable data={response} setData={setResponse} />
                        </section>
                        <Paginator pageCurrent={page} setPage={setPage} limit={10} total={response.total} />
                    </section>
                </main>
            </Layout>
        </AuthChecker>
    );
};

export default AdminDashboardCommentsPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    let error = {};
    let response = {};
    let user: Partial<User> = {}

    const cookies = req.headers.cookie;
    const parsedCookies = cookies ? parse(cookies) : {};
    const accessToken = parsedCookies.accessToken;
    const decodedToken = jwtDecode(accessToken) as AccessToken;

    if (accessToken) {
        user = await UserService.getUserByToken(`${process.env.API_URL}`, decodedToken.email, error);
        response = await CommentService.findAllComments(`${process.env.API_URL}`, error, `?page=1&limit=10&sortedBy=DESC`);
    }
    return {
        props: {
            data: response,
            user
        }
    };
};