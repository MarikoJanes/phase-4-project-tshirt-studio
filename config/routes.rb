Rails.application.routes.draw do
  
  resources :users, only: [:index, :show, :create]
  resources :tshirt_templates, only: [:index, :show]
  resources :designed_tshirts, only: [:index, :show, :create, :update]

  # Login 
  post "/login", to: "sessions#login"

  # stay Logged in 
  get "/authorized_user", to: "users#show"

  # Log out
  delete "/logout", to: "sessions#logout"


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
