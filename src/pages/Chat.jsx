import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material//Avatar";
import Fab from "@mui/material/Fab";
import SendIcon from "@mui/icons-material/Send";
import Brightness6Icon from "@mui/icons-material/Brightness6";
import CircularProgress from "@mui/material/CircularProgress";
import MoreVertIcon from "@mui/icons-material/MoreVert";

//Compoent
import Logo from "../assets/chatgptlogo2.png";
import useStore from "../store/useStore";
import { sendMesgToOpenAi } from "../hooks/openai";

const Chat = () => {
  const {
    userInput,
    setUserInput,
    history,
    appTheme,
    conversation,
    buttonLoading,
    setAppTheme,
    setConversation,
    setButtonLoading,
  } = useStore((s) => s);

  const truncateString = (str, maxLength) => {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + " ....";
    } else {
      return str;
    }
  };

  const changeTheme = () => {
    setAppTheme(appTheme === "dark" ? "light" : "dark");
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const onSubmit = async () => {
    setButtonLoading(true);
    const res = await sendMesgToOpenAi(userInput);
    setButtonLoading(false);
    setUserInput("");
    setConversation([
      ...conversation,
      {
        question: userInput,
        answer: res,
      },
    ]);
  };

  return (
    // <Box sx={{ width: "100vw", height: "100%" }}>
    <>
      {buttonLoading && (
        <CircularProgress
          size={68}
          sx={{
            position: "absolute",
            top: "40%",
            right: "40%",
            zIndex: 1,
          }}
        />
      )}
      <Grid container component={Paper} sx={{ width: "100vw", height: "auto" }}>
        <Grid item xs={3} sx={{ borderRight: "1px solid #e0e0e0" }}>
          <List>
            <ListItem key="chatGpt">
              <ListItemIcon>
                <Avatar alt="Chat GPT" src={Logo} />
              </ListItemIcon>
              <ListItemText primary="Chat GPT"></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              id="outlined-basic-email"
              label="Search"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Divider />
          <List>
            {history?.map((item, index) => (
              <ListItem button key={index}>
                <ListItemIcon>
                  <MoreVertIcon />
                </ListItemIcon>
                <ListItemText
                  primary={truncateString(item.question, 50)}
                ></ListItemText>
              </ListItem>
            ))}
          </List>
          <Grid item xs={3} sx={{ position: "fixed", bottom: 80, left: 20 }}>
            <Fab color="primary" aria-label="theme" onClick={changeTheme}>
              <Brightness6Icon />
            </Fab>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <List sx={{ height: "85vh", overflowY: "scroll", padding: 5 }}>
            {conversation.map((item, index) => (
              <Box key={index}>
                <ListItem>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: "Orange" }}>U</Avatar>
                  </ListItemIcon>
                  <ListItemText primary="You"></ListItemText>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={12} sx={{ paddingLeft: "1rem" }}>
                      <ListItemText
                        sx={{ paddingLeft: 5 }}
                        align="left"
                        primary={item.question}
                      ></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Avatar alt="Chat GPT" src={Logo} />
                  </ListItemIcon>
                  <ListItemText primary="Chat GPT"></ListItemText>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={12} sx={{ paddingLeft: "1rem" }}>
                      <ListItemText
                        sx={{ paddingLeft: 5 }}
                        align="left"
                        primary={item.answer}
                      ></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
              </Box>
            ))}
            <Box></Box>
          </List>
          <Divider />
          <Grid container sx={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                value={userInput}
                onChange={handleChange}
                id="outlined-basic-text"
                label="Ask Chat GPT..."
                fullWidth
              />
            </Grid>
            <Grid item xs={1} align="center">
              <Fab color="primary" aria-label="add" onClick={onSubmit}>
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
    // </Box>
  );
};

export default Chat;
