import moment from "moment";
import Date from "./date";

export default function Footer({ updated, created}: any) {
    return (
        <div className="flex flex-row justify-between px-3 pt-4 pb-3">
            <div className="flex flex-col">
                <Date date={'Updated ' + moment(updated).fromNow()} />
                <Date date={'Created ' + moment(created).format('MMM Do YYYY')} />
            </div>
        </div>
    )
}