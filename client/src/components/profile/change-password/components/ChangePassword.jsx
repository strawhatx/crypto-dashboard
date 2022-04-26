import React from "react";
import { Box, Button, Typography } from "@mui/material";
import * as Yup from "yup";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";

const UserProfileChangePasswordView = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { currentUser, update } = useAuthStore((state) => ({
    currentUser: state.currentUser,
    update: state.updateEmail,
  }));

  const handleSubmit = () => {
    update(email)
      .then(async () => {
        await axios.put("/accounts/", {
          uid: currentUser?.uid,
          email: email,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (currentUser) setEmail(currentUser?.email);
  }, [currentUser?.email]);

  return (
    <Box sx={{ display: "flex", mt: 4, alignItems: "center", width: "100%" }}>
      <TextField
        fullWidth
        autoComplete="current-password"
        type={showPassword ? "text" : "password"}
        label="Password"
        value={email}
        onInput={handleChange}
        sx={{ margin: "0px 24px 0px 0px", flexGrow: 1 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <Icon icon={showPassword ? eyeFill : eyeOffFill} />
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={Boolean(touched.password && errors.password)}
        helperText={touched.password && errors.password}
      />

      <Button size="large" type="submit" variant="text" onClick={handleSubmit}>
        Update
      </Button>
    </Box>
  );
};

export default UserProfileChangePasswordView;
