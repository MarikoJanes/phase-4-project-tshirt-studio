class TshirtTemplatesController < ApplicationController

    def index 
        render json: TshirtTemplate.all 
    end

    def show 
        tshirt = TshirtTemplate.find(params[:id])
        render json: tshirt
    end

end
