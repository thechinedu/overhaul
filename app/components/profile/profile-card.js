import React from 'react';
import tag from 'utils/tag';

const defaultBg = tag`https://avataaars.io/?avatarStyle=Transparent&topType=NoHair
&accessoriesType=Kurt&facialHairType=BeardMedium&facialHairColor=Black&clothe
Type=BlazerShirt&eyeType=Default&eyebrowType=RaisedExcited&mouthType=Serious
&skinColor=DarkBrown`;

const ProfileCard = ({profileImage, profileMetadata}) => (
  <aside className="profile__card">
    <div
      className="profile__card-header"
      style={{
        backgroundImage: `url(${profileImage || defaultBg})`
      }}
    ></div>

    <div
      className="profile__card-body"
      dangerouslySetInnerHTML={{__html: profileMetadata}}
    >
    </div>
  </aside>
);

export default ProfileCard;
