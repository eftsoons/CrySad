import lang from "@/lang";
import { useEffect } from "react";

import country from "@/function/country";
import randomuser from "@/function/randomuser";
import { backButton, init } from "@telegram-apps/sdk";
import { useNavigate } from "react-router-dom";

export function Stats({
  type,
  alluser,
  history,
  sethistory,
}: {
  type: "sad" | "lonely";
  alluser: number;
  history: {
    sad: Array<{ firstname: string; lang: "ru" | "en" | "br" | "in" | string }>;
    lonely: Array<{
      firstname: string;
      lang: "ru" | "en" | "br" | "in" | string;
    }>;
  };
  sethistory: Function;
  server: { post: Function };
}) {
  //const userinfo =

  const navigate = useNavigate();

  //const launchParams = retrieveLaunchParams();

  useEffect(() => {
    init();

    backButton.mount();

    backButton.show();
    return backButton.onClick(() => {
      backButton.hide();
      navigate("/");
    });
    //backButton.hide();
  }, []);

  useEffect(() => {
    /*const intervalid = setInterval(() => {
      server
        .post("/gethistory", {
          initData: launchParams.initDataRaw,
        })
        .then(
          (response: {
            data: {
              sad: Array<{ firstname: string; lang: string }>;
              lonely: Array<{ firstname: string; lang: string }>;
            };
          }) => {
            const data = response.data;

            sethistory(data);
          }
        );
    }, 250);*/

    let secinterval = 5000;

    const intervalid = setInterval(() => {
      secinterval = 1000 * Math.floor(Math.random() * (20 - 10) + 10);
      sethistory(
        (data: {
          sad: Array<{ firstname: string; lang: string }>;
          lonely: Array<{ firstname: string; lang: string }>;
        }) => {
          const info1 = [...data.sad];
          const info2 = [...data.lonely];

          const user = randomuser() as {
            firstname: string;
            lang: "ru" | "en" | "br" | "in";
          };

          if (type == "sad") {
            info1.splice(0, 0, user);
          } else {
            info2.splice(0, 0, user);
          }

          return { sad: info1, lonely: info2 };
        }
      );
    }, secinterval);

    return () => {
      clearInterval(intervalid);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      {type == "lonely" ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "1rem",
              position: "absolute",
              top: "2rem",
              left: "50%",
              transform: "translate(-50%)",
            }}
          >
            <div style={{ fontSize: "10rem" }}>🥺</div>
            <span>{lang.ilovely}</span>
          </div>
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
            }}
          >
            {lang.alllonely} {history.lonely.length + 1 + Number(alluser)}
          </span>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div
            style={{
              textAlign: "center",
              padding: "1rem",
              position: "absolute",
              top: "2rem",
              left: "50%",
              transform: "translate(-50%)",
            }}
          >
            <div style={{ fontSize: "10rem" }}>🥺</div>
            <span>{lang.isad}</span>
          </div>
          <span
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
            }}
          >
            {lang.allsad} {history.sad.length + 1 + Number(alluser)}
          </span>
        </div>
      )}
      <div
        style={{
          position: "absolute",
          height: "250px",
          width: "100%",
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          overflow: "scroll",
        }}
      >
        {history[type].slice(0, 4).map((data, index) => (
          <span key={index}>
            {/*{data.firstname} , {data.lang == "ru" ? country[data.lang] : "🏳"}*/}
            {data.firstname} ,{" "}
            {data.lang == "ru" ||
            data.lang == "en" ||
            data.lang == "in" ||
            data.lang == "br"
              ? country[data.lang]
              : "🏳"}
          </span>
        ))}
      </div>
    </div>
  );
}
