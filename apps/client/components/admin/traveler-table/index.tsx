import { Comment, Taste, Travel, Traveler } from "@/../../packages/types/src";
import { Icon } from "@iconify/react";
import moment from "moment";
import { FC } from "react";

interface IProps {
    data: Traveler[];
}

export const TravelerTable: FC<IProps> = ({ data }) => {
    return (
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
                <tr>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Id</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Tastes</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Travels</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Comments</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b">Created</th>
                    <th className="py-2 px-4 bg-gray-100 text-gray-500 border-b"></th>
                </tr>
            </thead>
            <tbody>
                {data.map((traveler: Traveler) =>
                    <tr key={traveler.id}>
                        <td className="py-2 px-4 border-b">{traveler.id}</td>
                        <td className="py-2 px-4 border-b">{traveler.tastes.map((taste: Taste) => <span key={taste.id} className="bg-blue-100 rounded-lg text-blue-500 py-1 px-2">{taste.id}</span>)}</td>
                        <td className="py-2 px-4 border-b">{traveler.travels.map((travel: Travel) => <span key={travel.id} className="bg-blue-100 rounded-lg text-blue-500 py-1 px-2">{travel.id}</span>)}</td>
                        <td className="py-2 px-4 border-b">{traveler.comments.map((comment: Comment) => <span key={comment.id} className="bg-blue-100 rounded-lg text-blue-500 py-1 px-2">{comment.id}</span>)}</td>
                        <td className="py-2 px-4 border-b">{moment(traveler.createdAt).format('DD/MM/YYYY')}</td>
                        <td className="py-8 px-4 border-b">
                            <div className="w-full h-full flex">
                                <button>
                                    <Icon icon="akar-icons:edit" className="w-6 h-6 mr-12" />
                                </button>
                                <button>
                                    <Icon icon="material-symbols:delete" className="w-6 h-6" />
                                </button>
                            </div>
                        </td>
                    </tr>)}
            </tbody>
        </table>

    );
};