import { ROUTES } from "@travel-tailor/constants";
import { ActivityTagService } from "@travel-tailor/services";
import { Player } from "@lottiefiles/react-lottie-player";
import { usePathname, useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";

interface IEditTagForm {
    name: string
}

export const EditTagForm: FC = () => {
    const [apiErrors, setApiErrors] = useState<Error>({
        cause: "",
        name: "",
        message: "",
    });
    const [submit, setSubmit] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors } } = useForm<IEditTagForm>();

    const router = useRouter();
    const pathname = usePathname();

    const onSubmit = async (data: IEditTagForm) => {
        setSubmit(true);
        const response = await ActivityTagService.updateActivityTag(`${process.env.NEXT_PUBLIC_API_URL}`, pathname.substring(10,100), data, setApiErrors);
        if (response) {
            setSubmit(false);
            router.push(ROUTES.ADMIN.TAGS);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-4 col-span-4 md:col-span-8 xl:col-span-12">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                    Name
                </label>
                <input
                    {...register("name", {
                        required: "Name is required",
                    })}
                    id="name"
                    type="text"
                    onClick={() => setApiErrors({ message: "", name: "", cause: "" })}
                    className="shadow appearance-none border rounded w-full px-3.5 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.name && <p className="mt-2 text-red-500 text-xs italic">{errors.name.message?.toString()}</p>}
            </div>
            <div className="flex flex-col items-center justify-between">
                <button
                    type="submit"
                    aria-live="assertive"
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    {submit ? <Player
                        src='https://assets5.lottiefiles.com/packages/lf20_jk6c1n2n.json'
                        className="w-5 h-5"
                        loop
                        autoplay
                    /> : <>Edit tag</>}
                </button>
            </div>
        </form>
        </div>
    );
};