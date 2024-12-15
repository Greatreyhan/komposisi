import React from "react";
import Avatar from "../components/atoms/Avatar";

const Test = () => {
    return (
        <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold">Badge Component Examples</h1>

            <div className="flex justify-around gap-x-5">
                <div className="flex space-x-4">
                    <Avatar
                        src="https://images.unsplash.com/photo-1519713880332-91cfe19a59dd?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Profile"
                        size="medium"
                        rounded="full"
                        status="online"
                        statusPosition="top-right"
                    />
                    <Avatar
                        src="https://images.unsplash.com/photo-1519713880332-91cfe19a59dd?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Profile"
                        size="large"
                        rounded="medium"
                        status="busy"
                        statusPosition="top-left"
                    />
                </div>
            </div>
        </div>
    );
};

export default Test;
