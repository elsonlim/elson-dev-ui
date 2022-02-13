import axios from "axios";
import { FC } from "react";
import Button from "@mui/material/Button";

const Welcome: FC = () => {
  return (
    <div>
      <div>welcome</div>
      <Button
        variant="contained"
        onClick={() =>
          axios.get("http://localhost:5000/user", { withCredentials: true })
        }
      >
        get user
      </Button>
      <Button
        onClick={() =>
          axios.get("http://localhost:5000/admin/users", {
            withCredentials: true,
          })
        }
      >
        get
      </Button>
      <Button
        onClick={() =>
          axios.patch(
            "http://localhost:5000/admin/users/61fe858904c53a89f585dd2f",
            {
              approved: false,
            },
            {
              withCredentials: true,
            }
          )
        }
      >
        patch
      </Button>
    </div>
  );
};

export default Welcome;
