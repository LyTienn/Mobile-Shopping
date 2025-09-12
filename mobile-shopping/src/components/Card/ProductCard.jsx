import React from "react";
import { addToCart } from "../../redux/cart/CartSlice";
import { useNavigate } from "react-router-dom";
import { Card, Button, Rate } from "antd";

const { Meta } = Card;

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const roundToHalf = (num) => Math.round(num * 2) / 2;

    return (
        <Card
        hoverable
        style={{ width: "100%" }}
        cover={
            <img
            src={product.thumbnail || product.images?.[0]}
            alt={product.name || product.title}
            style={{ width: "100%", objectFit: "contain" }}
            />
        }
        onClick={() => navigate(`/shop/product/${product.id}`)}
        >
        <Meta
            title={product.name || product.title}
            description={
            <div>
                <p className="font-medium text-red-500" style={{ marginBottom: 4 }}>${product.price}</p>
                <Rate allowHalf defaultValue={roundToHalf(product.rating || 0)} />
            </div>
            }
        />
        </Card>
    );
};

export default ProductCard;