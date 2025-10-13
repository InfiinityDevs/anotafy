import Layout from "../../components/Layout";
import SideBar from "../../components/SideBar";

export default function Garcon() {
    return (
        <Layout
            sidebar={<SideBar />}
            content={<div />}
        />
    );
}