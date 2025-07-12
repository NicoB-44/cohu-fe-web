import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { DropApi } from "@TYPES/index";
import DropContext from "@PROVIDERS/DropContext";

const useDropHistoryQuery = (region : string) => {
    const { client } = useContext(DropContext);
    const { data, isLoading, error } = useQuery<DropApi.DropHistory>({
        queryKey: ["dropHistory", region],
        queryFn: async () => client.getDropHistory(region)
    });
    return {
        data: data?.map((item) => ({
            ...item,
            id: item.dropId
        })) || [],
        isLoading,
        error,
    };
};

export default useDropHistoryQuery;
