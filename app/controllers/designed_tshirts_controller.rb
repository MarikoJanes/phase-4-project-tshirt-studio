class DesignedTshirtsController < ApplicationController

    def index 
        render json: DesignedTshirt.all 
    end

    def show 
        tshirt = find_tshirt
        render json: tshirt 
    end

    def create 
        tshirt = DesignedTshirt.create!(tshirt_params)
        render json: tshirt, status: :created
    end

    def update 
        tshirt = find_tshirt
        tshirt.update!(tshirt_params)
        render json: tshirt, status: :accepted
    end

    def destroy 
        tshirt = DesignedTshirt.find(params[:id])
        tshirt.destroy
        head :no_content 
    end


    private 

    def tshirt_params
        params.permit(:user_id, :tshirt_template_id, :front_design, :back_design, :private)
    end
    
    def find_tshirt
        DesignedTshirt.find(params[:id])
    end


end
