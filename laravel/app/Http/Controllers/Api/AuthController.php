<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function signup(RegisterRequest $request): JsonResponse
    {
        try {
            // 1. Création de l'utilisateur
            $user = User::create([
                'first_name' => $request->name,
                'email' => $request->email,
                'password' => $request->password,
            ]);
            $user->profile()->create();

            // 2. Connexion étatique (crée la session et le cookie d'authentification)
            Auth::login($user);

            // 3. Régénération de la session pour éviter les fixations de session
            $request->session()->regenerate();

            // 4. Réponse 201 (Pas de token retourné, le cookie gère tout)
            return response()->json([
                'status' => 'success',
                'message' => 'User registered and authenticated successfully',
                'user' => $user->load('profile'),
            ], 201);

        } catch (Exception $e) {
            Log::error('Stateful Signup Error: ' . $e->getMessage());

            return response()->json([
                'status' => 'error',
                'message' => 'Something went wrong. Please try again later.'
            ], 500);
        }
    }

    public function login(LoginRequest $request): JsonResponse{
        try{
            $credentials = $request->only(['email', 'password']);
            $remember = $request->has('remember');
            if(Auth::attempt($credentials, $remember)){
                $request->session()->regenerate();
                return response()->json([
                    'status' => 'success',
                    'message' => 'You are connected successfully.',
                    'user' => $request->user()->load('profile'),
                ]);
            }
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid credentials.'
            ], 401);
        }catch (Exception $e) {
            Log::error('Stateful Login Error: '. $e->getMessage());

            return response()->json([
                'status' => 'error',
                'message' => 'Something went wrong. Please try again later.'
            ], 500);
        }
    }

    public function logout(Request $request): JsonResponse{
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json([
            'status' => 'success',
            'message' => 'You are deconnected.'
        ]);
    }

    public function authUser(Request $request): JsonResponse
    {
        // 1. On récupère l'utilisateur
        $user = $request->user();
        // 2. Sécurité : Si l'utilisateur n'est pas trouvé (session expirée)
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthenticated.'
            ], 401);
        }
        // 3. On charge la relation avec le profil
        $user->load('profile');
        // 4. On conserve la structure avec la clé 'data' -> 'user'
        return response()->json([
            'status' => 'success',
            'user' => $user
            
        ], 200);
    }

}