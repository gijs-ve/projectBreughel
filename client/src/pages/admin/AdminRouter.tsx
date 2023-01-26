import { Routes, Route } from "react-router-dom";
import { AdminPaintings } from "./AdminPaintings";
export const AdminRouter = () => {
    return <Routes><Route path="/paintings" element=<AdminPaintings /> /></Routes>;
}