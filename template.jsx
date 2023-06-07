import React from './React.polyfill.mjs';
import fs from 'fs';
import sharp from 'sharp';

const logo = fs.readFileSync('./img/apify_logo_512px.png').buffer;
const background = fs.readFileSync('./img/background.png').toString('base64');

const IMAGE_FETCH_RETRIES = 5;

async function getImageBuffer(url) {
  for (let i = 0; i < IMAGE_FETCH_RETRIES; i++) {
    try {
      return (await sharp(await fetch(url).then(x => x.arrayBuffer())).toFormat('png').toBuffer()).buffer;
    } catch (e) {
    }
  }
}

function TagPill({title}) {
  return (
    <div style={{
      display: 'flex',
      background: '#E1EAFF',
      borderRadius: '8px',
      color: '#1A57DA',
      padding: '5px 10px',
      marginRight: '10px',
    }}>
      {title}
    </div>
  )
}

function roundToString(num) {
  const suffixes = ['', 'K', 'M', 'B', 'T'];

  if(num < 1000) {
    return num.toString();
  }

  const exp = Math.floor(Math.log(num) / Math.log(1000));
  const suffix = suffixes[exp];
  const roundedNum = Math.floor(num / Math.pow(1000, exp));
  
  return `${roundedNum}${suffix}`;
}

export async function ogImage({
  actorName, 
  actorIconUrl, 
  tag,
  authorName,
  authorAvatarUrl,
  tags,
  users,
  runs
} = {}) {
let actorIcon = actorIconUrl ? await getImageBuffer(actorIconUrl) : null;
let authorAvatar = authorAvatarUrl ? await getImageBuffer(authorAvatarUrl) : null;

return (
<div
  style={{
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    backgroundImage: `url("data:image/png;base64,${background}")`,
    fontSize: 60,
    fontWeight: 600,
    padding: 50,
    boxSizing: 'border-box',
    borderBottom: '20px solid #CFD4EB',
    padding: '50px 50px',
  }}
>
<div style={{
  display: 'flex',
  width: '15%',
  marginBottom: '40px',
  }}>
    <img src={logo} style={{objectFit: 'contain'}}></img>
</div>
<div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '100%', paddingBottom: '8%'}}>
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
  <div style={{display: 'flex', flexDirection: 'column'}}>
  <div style={{display: 'flex', fontFamily: 'Graphik-Semibold', padding: '20px 0px'}}>
    {actorName}
  </div>
  <div style={{display: 'flex', fontFamily: 'Graphik-Regular', fontSize: '0.5em'}}>
    <span style={{borderRadius: '10px', backgroundColor: '#f2f2f2', padding: '10px'}}>
      {tag}
    </span>
  </div>
  <div style={{display: 'flex', marginTop: '20px'}}>
    <div style={{display: 'flex', fontFamily: 'Graphik-Regular', fontSize: '0.5em', marginTop: '10px'}}>
      <span style={{display: 'flex', alignItems: 'center'}}>
        <img src={authorAvatar} style={{width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', marginRight: '5px'}}></img>
        <span style={{fontFamily: 'Graphik-Semibold', marginLeft: '10px', fontSize: '0.8em' }}>
          {authorName}
        </span>
      </span>
      </div>
  </div>
  </div>
  <img src={actorIcon} style={{width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', marginRight: '20px'}}/>
</div>
<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
  <div style={{display: 'flex', fontFamily: 'Graphik-Regular', fontSize: '0.4em'}}>
    {tags.map((tag) => (
      <TagPill title={tag} />
    ))}
  </div>
  <div style={{display: 'flex' }}>
    <span style={{ marginRight: '10px', display: 'flex', alignItems: 'flex-end'}}>
    <span style={{ fontFamily: 'Graphik-Semibold', fontSize: '0.5em', marginRight: '3px' }}>{roundToString(users)}</span><span style={{
      fontFamily: 'Graphik-Regular',
      fontSize: '0.4em'
    }}>users</span> 
    </span>
    <span style={{ marginRight: '10px', display: 'flex', alignItems: 'flex-end'}}>
    <span style={{ fontFamily: 'Graphik-Semibold', fontSize: '0.5em', marginRight: '3px'}}>
      {roundToString(runs)}
    </span>
    <span style={{
      fontFamily: 'Graphik-Regular',
      fontSize: '0.4em'
    }}>runs</span> 
    </span>
  </div>
</div>
</div>
</div>
);
}