import { redirect } from "next/navigation" // サーバーコンポーネントでリダイレクトを行うための関数
import { signIn, auth, providerMap } from "@/auth" // 認証関連の関数やプロバイダー情報をインポート
import { AuthError } from "next-auth" // 認証エラーの型をインポート

// エラー発生時に遷移するページのURL
const SIGNIN_ERROR_URL = "/error"

// サインインページのメインコンポーネント
export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined } // クエリパラメータからコールバックURLを受け取る
}) {
  return (
    <div className="flex flex-col gap-2"> {/* 縦方向に要素を並べるレイアウト */}
      
      {/* ---- メールアドレスとパスワードを用いたログインフォーム ---- */}
      <form
        action={async (formData) => {
          "use server" // サーバーアクションで実行されることを明示
          try {
            // credentials プロバイダを利用してサインインを実行
            await signIn("credentials", formData)
          } catch (error) {
            // 認証エラーの場合はエラーページにリダイレクト
            if (error instanceof AuthError) {
              return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
            }
            // それ以外の予期しないエラーはスローしてNext.jsに処理させる
            throw error
          }
        }}
      >
        {/* メールアドレス入力欄 */}
        <label htmlFor="email">
          Email
          <input name="email" id="email" />
        </label>

        {/* パスワード入力欄 */}
        <label htmlFor="password">
          Password
          <input name="password" id="password" />
        </label>

        {/* サインインボタン */}
        <input type="submit" value="Sign In" />
      </form>

      {/* ---- OAuth プロバイダ(Google, GitHubなど)を用いたログインフォーム ---- */}
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id} // 各プロバイダをユニークに識別
          action={async () => {
            "use server" // サーバーアクション
            try {
              // 各プロバイダを利用してサインインを実行
              await signIn(provider.id, {
                redirectTo: props.searchParams?.callbackUrl ?? "", // サインイン後のリダイレクト先
              })
            } catch (error) {
              // 認証エラーの場合はエラーページへ
              if (error instanceof AuthError) {
                return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
              }
              // それ以外はNext.jsに処理を任せる
              throw error
            }
          }}
        >
          {/* プロバイダ名をボタンに表示 */}
          <button type="submit">
            <span>Sign in with {provider.name}</span>
          </button>
        </form>
      ))}
    </div>
  )
}
