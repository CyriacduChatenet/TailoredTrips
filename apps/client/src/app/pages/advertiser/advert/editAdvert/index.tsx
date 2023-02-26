import { FC } from "react";
import { useParams } from "@travel-manager/functions";

import { EditAdvertForm } from "@/app/components/advert/editAdvertForm";

export const EditAdvertPage: FC = () => {
  const params = useParams();
  return (
    <div>
      <h1>Edit advert</h1>
      <EditAdvertForm id={params.id} />
    </div>
  );
};