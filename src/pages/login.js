import React from "react"
import { navigate } from "gatsby"
import styled from "styled-components"
import { AuthService, useAuth } from "gatsby-theme-auth0"

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledButton = styled.button`
  border: 1px solid black;
  border-radius: 8px;
  color: var(--textDark);
  padding: 2em;
`

const LoginPage = () => {
  const { isLoggedIn } = useAuth()
  return (
    <>
      {isLoggedIn ? (
        navigate("/")
      ) : (
        <StyledContainer>
          <StyledButton type="button" onClick={AuthService.login}>
            LOG IN
          </StyledButton>
        </StyledContainer>
      )}
    </>
  )
}

export default LoginPage
