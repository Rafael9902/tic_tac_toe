<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;
use App\Models\GameDetails;


class GameController extends Controller
{

    public function __construct(){
        $this->middleware('cors');
    }
        
    
    public function index(){

        $data = [
            'status' => 200,
            'message' => 'Tic Tac Toe api'
        ];

        return response()->json($data);
    }

    public function save(Request $request, $id = null){

        /*
         * 1. Get Data
         * 2. Decode Data
         */
        $json = $request->input('json', null); //Received json
        $params = json_decode($json);                      //Data Object
        $params_array = json_decode($json,true); //Data Array


        //Validation
        if(!empty($params) && !empty($params_array)){

            $validate = \Validator::make($params_array,[
                'player_1'     => 'required|string|min:1|max:100',
                'player_2'  => 'required|string|min:1|max:100'
            ]);

            if($validate->fails()){
                $data = [
                    'status'  => 'error',
                    'code'    => '404',
                    'message' => 'Game not created'
                    ,'errors' => $validate->errors()
                ];
                return response()->json($data, 400);
            }
        }

        //Create new game or update an existing one
        $game = isset($id) ? Game::find($id) : new Game();

        //Create Game
        $game->player_1 = $params_array['player_1'];
        $game->player_2 = $params_array['player_2'];
        $game->save();

        //Create Details
        if(isset($id)){
            $game_details = new GameDetails();
            $game_details->game_id = $game->id;
            $game_details->winner = $params_array['winner'];
            $game_details->save();
        }

        $data = [
            'status' => 200,
            'game' => $game
        ];
        return response()->json($data, 200);
    }
}
