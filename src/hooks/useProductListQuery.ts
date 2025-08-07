import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { DropApi } from "@TYPES/index";
import DropContext from "@PROVIDERS/DropContext";

const useProductListQuery = (region : string) => {
    const { client } = useContext(DropContext);
    const { data, isLoading, error } = useQuery<DropApi.ProductList>({
        queryKey: ["productList", region],
        queryFn: async () => client.getProductList(region)
    });
    return {
        data,
        isLoading,
        error,
    };
};

export default useProductListQuery;
