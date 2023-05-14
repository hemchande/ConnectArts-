import { useEffect, useState } from "react";
import axios from "axios";
import {useAuth} from "./firebase/AuthContext"



const StripeDashboard = () => {

    const [id, setId] = useState('')
    const [loginLink, setLink] = useState('')


    useEffect(() => {

        //GET ID FROM FIREBASE ID 




    });


    generateStripeLinkButton.addEventListener("click", async function() {
        const generateStripeLinkButton = document.getElementById("generate-stripe-link");
        const dashboardLink = document.getElementById("dashboard-link");
        const response = await axios.get(`/generate_stripe_dashboard_link`), {id: id};
        setLink(response.text)
        //dashboardLink.href = loginLink;
      });







    return (

        <div>
            <button id="generate-stripe-link">Generate Stripe Dashboard Link</button>
            <a id="dashboard-link" href= {loginLink}>View Dashboard</a>
        </div>




    );
}