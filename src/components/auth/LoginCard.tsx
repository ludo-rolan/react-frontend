'use client';
import React  from "react";
import Input from "../Input";

const LoginCard = () => {
    return (
        <>
            <div>
                <header>Login</header>
                <main>
                    <form action="/login" method="post" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="username">Username: </label>
                        <Input type="text" placeholder="login" classes="h-24 w-44 rounded outlined"></Input>
                    </form>
                </main>
                <footer>
                    <img src="/assets/images/deepleaf.jpeg" alt="logo" />
                </footer>
            </div>
        </>
    )
}