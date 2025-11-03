export default function FormatDateForInput(date: string | Date){
    if (!date) return "";
    if (typeof date === "string") {
        return date.split("T")[0];
    }
    return date.toISOString().split("T")[0];
};