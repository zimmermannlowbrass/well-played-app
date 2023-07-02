import React from "react";

function Profile({ user }){

    // const [canEdit, setCanEdit] = useState(false)

    function handleClick(e) {
       
    }

    return(
        <div>
            <h1>This is the Profile section!</h1>
            <div>
                <h4>Name: {user.name}</h4>
                <h4>Rank: {user.rank}</h4>
                <h4>Age: {user.age}</h4>
                <h4>Email: {user.email}</h4>
                <div className='cardContainer'>
                    <h2>Password</h2>
                    <input type="text"></input>
                    <button onClick={(e) => handleClick(e)}>Edit Profile</button>
                </div>
            </div>
        </div>
    )
}

export default Profile;