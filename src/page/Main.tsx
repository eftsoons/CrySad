import { retrieveLaunchParams } from "@telegram-apps/sdk-react";
import { useNavigate } from "react-router-dom";
import lang from "@/lang";

export function Main({
  alluser,
  server,
  setalluser,
  sethistory,
}: {
  alluser: number;
  server: { post: Function };
  setalluser: Function;
  sethistory: Function;
}) {
  const navigate = useNavigate();

  const launchParams = retrieveLaunchParams();
  const firstname = launchParams?.initData?.user?.firstName;
  const languser = launchParams?.initData?.user?.languageCode;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        justifyContent: "center",
        width: "100%",
        height: "95%",
      }}
    >
      <div
        style={{
          width: "100%",
          /*display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",*/
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div
          style={{
            textAlign: "center",
            borderRadius: "2rem",
            padding: "1rem",
            transition: "0.5s",
            cursor: "pointer",
          }}
          onClick={() =>
            server
              .post("/setprofile", {
                initData: launchParams.initDataRaw,
                profile: "sad",
              })
              .then(
                (response: {
                  data: { all: number; sad: number; lonely: number };
                }) => {
                  if (firstname && languser) {
                    sethistory(
                      (data: {
                        sad: Array<{ firstname: string; lang: string }>;
                        lonely: Array<{ firstname: string; lang: string }>;
                      }) => {
                        const info1 = [...data.sad];
                        const info2 = [...data.lonely];

                        info1.splice(0, 0, {
                          firstname: firstname,
                          lang: languser,
                        });

                        return { sad: info1, lonely: info2 };
                      }
                    );
                    const data = response.data;
                    setalluser(data);
                    navigate("/sad");
                  }
                }
              )
              .catch(() => {
                navigate("/sad");
              })
          }
        >
          <div style={{ fontSize: "10rem" }}>🥺</div>
          <span>{lang.isad}</span>
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "1rem",
            borderRadius: "2rem",
            transition: "0.5s",
            cursor: "pointer",
          }}
          onClick={() =>
            server
              .post("/setprofile", {
                initData: launchParams.initDataRaw,
                profile: "lonely",
              })
              .then(
                (response: {
                  data: { all: number; sad: number; lonely: number };
                }) => {
                  if (firstname && languser) {
                    sethistory(
                      (data: {
                        sad: Array<{ firstname: string; lang: string }>;
                        lonely: Array<{ firstname: string; lang: string }>;
                      }) => {
                        const info1 = [...data.sad];
                        const info2 = [...data.lonely];

                        info2.splice(0, 0, {
                          firstname: firstname,
                          lang: languser,
                        });

                        return { sad: info1, lonely: info2 };
                      }
                    );
                    const data = response.data;
                    setalluser(data);
                    navigate("/lonely");
                  }
                }
              )
              .catch(() => {
                navigate("/lonely");
              })
          }
        >
          <div style={{ fontSize: "10rem" }}>😔</div>
          <span>{lang.ilovely}</span>
        </div>
      </div>
      <span>
        {lang.alluser} {6000 + Number(alluser)}
      </span>
    </div>
  );
}
