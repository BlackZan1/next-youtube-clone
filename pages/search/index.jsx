import MainLayout from "../../components/MainLayout";
import { useSelector } from "react-redux";
import SearchWrapper from "../../components/SearchWrapper";

export default function Search() {
    const items = useSelector(store => store.search.items);

    return (
        <MainLayout>
            <SearchWrapper data={items} />
        </MainLayout>
    )
}