import { ROUTES } from '@travel-tailor/constants'
import { AdvertiserService, TokenService, UserService } from '@travel-tailor/services'
import { CreateAdvertiserDTO } from '@travel-tailor/types'
import { useRouter } from 'next/router'
import { ChangeEvent, FC, FormEvent, MouseEvent, useState } from 'react'

import Geocoder from '../../../../atoms/geocoder/react'

interface IProps {
  api_url: string
  mapboxAccessToken: string;
}

export const WebCreateAdvertiserForm: FC<IProps> = ({ api_url, mapboxAccessToken }) => {
  const router = useRouter()

  const userId = router.query.id

  const [credentials, setCredentials] = useState<CreateAdvertiserDTO>({
    name: '',
    user: String(userId),
    location: '',
  })

  const [results, setResults] = useState([]);
  const [hideAutocomplete, setHideAutocomplete] = useState(true);
  const [geocoderQuery, setGeocoderQuery] = useState('');

  const handleResultSelected = (result: any) => {
    setResults(result);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  const handleClick = (e: MouseEvent<HTMLParagraphElement>) => {
    e.preventDefault()
    setCredentials({ ...credentials, location: e.currentTarget.innerText })
    setGeocoderQuery(e.currentTarget.innerText);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const advertiser = await AdvertiserService.createAdvertiser(
      `${api_url}/advertiser`,
      credentials
    )
    await UserService.updateUser(`${api_url}`, String(userId), { advertiser: advertiser.id })
    TokenService.removeSigninToken();
    return router.push(ROUTES.SIGNIN)
  }

  return (
    <form action="" onSubmit={handleSubmit} onMouseEnter={() => setHideAutocomplete(!hideAutocomplete)} onMouseLeave={() => setHideAutocomplete(!hideAutocomplete)}>
      <label htmlFor="">
        <span>Name</span>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={handleChange}
        />
      </label>
      <label htmlFor="">
        <span>Location</span>
        <Geocoder onResultSelected={handleResultSelected} accessToken={mapboxAccessToken} geocoderQuery={geocoderQuery} setGeocoderQuery={setGeocoderQuery}/>
        <br />
        {!hideAutocomplete ? results.map((result: any) => <p key={result.id} onClick={handleClick}>{result.place_name}</p>) : null}
      </label>
      <input type="submit" value="Create advertiser" />
    </form>
  )
}
