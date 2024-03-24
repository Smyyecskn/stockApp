import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { Formik, Form } from "formik";
import { object, string } from "yup";
import useAuthCalls from "../service/useAuthCalls";

const Login = () => {
  const { login } = useAuthCalls();
  const loginSchema = object({
    //yup da kullandıgımız referans fonksıyonu objecttir.

    email: string()
      .email("Lütfen geçerli bir email giriniz.")
      .required("Email girişi zorunludur."),
    password: string()
      .required("Password zorunludur.")
      .min(8, "Password en az 8 karakter olmalıdır.")
      .matches(/\d+/, "Password en az bir rakam içermelidir.")
      .matches(/[A-Z]/, "Password en az bir büyük harf içermelidir."),
  });

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              login(values);
              actions.resetForm();
              actions.setSubmitting(false); //1.49
              //TODO login(post) istegi şifremizi ve mailimizi gönderdiğimiz için post isteği oluyor.
              //navigasyon ,toast yapılabilir ve verileri globalstate aktarılabilir.
              //
            }}
          >
            {({ handleChange, values, touched, errors, handleBlur }) => (
              //1.58 bu değişkenler formikin sağladığı özellikler=>  touched = dokunuldu mu? dokunulduysa uyarı vermesını saglayan değişken, errors = validate ya da validationSchema ile beraber çalışır.
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="Email"
                    name="email"
                    id="email"
                    type="email"
                    variant="outlined"
                    values={values.email}
                    onBlur={handleBlur} //inputtan ayrıldıgımızı belirten event onBlur,
                    //onBlur oldugunu formıge gosteren ozellık handleBlur
                    onChange={handleChange}
                    error={ touched.email && Boolean(errors.email)}
                    helperText={errors.email} //Atta minik hata yazılarını muıden gelen bir özellik errorun true olmasına gore çıkarır.
                  />

                  <TextField
                    label="password"
                    name="password"
                    id="password"
                    type="password"
                    variant="outlined"
                    onBlur={handleBlur}
                    values={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={errors.password}
                  />
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Do you have not an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={image} alt="img" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
