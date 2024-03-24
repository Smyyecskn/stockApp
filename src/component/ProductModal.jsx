import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import useStockCalls from "../service/useStockCalls";
import { modalStyle } from "../styles/globalStyles";

const ProductModal = ({ open, handleClose, info, setInfo }) => {
  const { postStock, putStock } = useStockCalls();

  const handleChange = (e) => {
    // const { name, value } = e.target
    // setInfo({ ...info, [name]: value })
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  console.log(info);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (info?._id) {
      putStock("products", info);
    } else {
      postStock("products", info);
    }

    handleClose();
  };

  console.log(info);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            component="form"
            onSubmit={handleSubmit}
          >
           
            <TextField
              label="Address"
              name="address"
              id="address"
              type="text"
              variant="outlined"
              value={info?.address}
              onChange={handleChange}
              required
            />

            <Button type="submit" variant="contained" size="large">
              {info?._id ? "Update Firm" : "Add Firm"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductModal;
