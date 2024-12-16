import {
  useLaunchParams,
  miniApp,
  postEvent,
  retrieveLaunchParams,
} from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";
import { Main } from "@/page/Main";
import { Stats } from "@/page/Stats";
import { Rotate } from "@/page/Rotate";

import { Route, Routes, useNavigate } from "react-router-dom";

import randomuser from "@/function/randomuser";

import axios from "axios";
import axiosRetry from "axios-retry";

const server = axios.create({
  baseURL: "https://crysad.ru/",
});

export function App() {
  const lp = useLaunchParams();

  const launchParams = retrieveLaunchParams();

  const [alluser, setalluser] = useState({ all: 0, sad: 0, lonely: 0 });
  const [history, sethistory] = useState<{
    sad: Array<{ firstname: string; lang: "ru" | "en" | "br" | "in" }>;
    lonely: Array<{ firstname: string; lang: "ru" | "en" | "br" | "in" }>;
  }>({ sad: [], lonely: [] });

  axiosRetry(server, {
    retries: Infinity,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (error) => {
      if (error.status != 405) {
        navigate("/rotate");
      }

      return error.status != 405;
    },
  });

  useEffect(() => {
    miniApp.ready();

    server
      .post("/", {
        initData: launchParams.initDataRaw,
      })
      .then((response) => {
        const data = response.data;

        if (data.profile == null) {
          navigate("/");
        } else {
          navigate(`/${data.profile}`);
        }
        setalluser(data.alluser);
      });

    /*server
      .post("/gethistory", {
        initData: launchParams.initDataRaw,
      })
      .then((response) => {
        const data = response.data;

        sethistory(data);
      });*/

    const historysad = [] as Array<{
      firstname: string;
      lang: "ru" | "en" | "br" | "in";
    }>;
    const historylonely = [] as Array<{
      firstname: string;
      lang: "ru" | "en" | "br" | "in";
    }>;

    for (let i = 0; i <= 3000; i++) {
      const user1 = randomuser() as {
        firstname: string;
        lang: "ru" | "en" | "br" | "in";
      };
      const user2 = randomuser() as {
        firstname: string;
        lang: "ru" | "en" | "br" | "in";
      };

      historysad.push(user1);
      historylonely.push(user2);
    }

    sethistory({ sad: historysad, lonely: historylonely });

    postEvent("web_app_expand");
  }, []);

  const navigate = useNavigate();

  return (
    <AppRoot
      appearance={"light"}
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
      style={{
        height: "100%",
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <Main
              server={server}
              alluser={alluser.all}
              setalluser={setalluser}
              sethistory={sethistory}
            />
          }
        />
        <Route
          path="/sad"
          element={
            <Stats
              type="sad"
              alluser={alluser.sad}
              history={history}
              sethistory={sethistory}
              server={server}
            />
          }
        />
        <Route
          path="/lonely"
          element={
            <Stats
              type="lonely"
              alluser={alluser.lonely}
              history={history}
              sethistory={sethistory}
              server={server}
            />
          }
        />
        <Route path="/rotate" element={<Rotate />} />
      </Routes>

      {/*<div
        style={{
          display: "flex",
          gap: "5px",
          flexDirection: "column",
          width: "90%",
          padding: "1rem",
        }}
      >
        <span>Активность в приложении:</span>
        <div
          style={{
            marginTop: "1rem",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div
            style={{
              padding: "1rem",
              //border: "2px solid var(--tg-theme-accent-text-color)",
            }}
          >
            <div>
              <span>
                Кому-то из 🇧🇷 сейчас грустно. Всего грустных из 🇧🇷: 15
              </span>
            </div>
          </div>
        </div>
      </div>*/}
    </AppRoot>
  );
}
