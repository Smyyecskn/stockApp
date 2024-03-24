import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useStockCalls from "../service/useStockCalls";
import { useSelector } from "react-redux";
import ProductModal from "../component/ProductModal";
import ProductTable from "../component/ProductTable";

const Products = () => {
  const { getStocks } = useStockCalls();
  const { products } = useSelector((state) => state.stock);
  const initialState = {
    name: "",
    phone: "",
    address: "",
    image: "",
  };

  const [info, setInfo] = useState(initialState);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInfo(initialState);
  };

  useEffect(() => {
    getStocks("products");
  }, []);
  console.log(products);
  return (
    <div>
      <Typography variant="h5" color="error" mb={3}>
        Products
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        New Product
      </Button>

      <ProductModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />

      <ProductTable />
    </div>
  );
};

export default Products;
