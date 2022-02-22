import { useParams } from "react-router-dom";

const Diary = () => {
    const {id} = useParams();
    return <h2>Diary</h2>
}
export default Diary;