import React, { useEffect, useRef } from "react";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const App = () => {
  const zpRef = useRef(null);
  const userID = "user" + Math.floor(Math.random() * 1000);
  const userName = "react_" + userID;
  const appID = 496927413;
  const serverSecret = "d202ef8a690d9057e88dd0d4cd12b32c";
  const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    null,
    userID,
    userName
  );

  useEffect(() => {
    const zp = ZegoUIKitPrebuilt.create(TOKEN);
    zpRef.current = zp;
    zp.addPlugins({ ZIM });
  }, [TOKEN]);

  function invite(callType) {
    const targetUser = {
      userID: prompt("Enter callee's userId"),
      userName: prompt("Enter callee's userName"),
    };
    zpRef.current
      .sendCallInvitation({
        callees: [targetUser],
        callType,
        timeout: 60,
      })
      .then((res) => console.warn(res))
      .catch((err) => console.warn(err));
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 shadow-2xl backdrop-blur-sm border border-gray-700">
        <h2 className="text-white text-lg sm:text-xl mb-2">
          <span className="text-green-400 font-semibold">UserName:</span> {userName}
        </h2>
        <h2 className="text-white text-lg sm:text-xl mb-6">
          <span className="text-green-400 font-semibold">UserId:</span> {userID}
        </h2>

        <div className="flex flex-col gap-4">
          <button
            className="bg-green-500 hover:bg-green-600 active:scale-95 transition text-white text-lg py-3 rounded-xl font-semibold shadow-md"
            onClick={() => invite(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}
          >
            🎙️ Voice Call
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition text-white text-lg py-3 rounded-xl font-semibold shadow-md"
            onClick={() => invite(ZegoUIKitPrebuilt.InvitationTypeVideoCall)}
          >
            🎥 Video Call
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
