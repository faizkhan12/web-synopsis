import { useState, useEffect } from "react";
import { copy, linkIcon, loader, tick, logoPng } from "../assets";
import { useLazyGetSummaryQuery } from "../redux/services/article";
import { useTranslation } from "react-i18next";

const Demo = () => {
  const { t } = useTranslation();

  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticle, setAllArticle] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articleFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );
    if (articleFromLocalStorage) {
      setAllArticle(articleFromLocalStorage);
    }
  }, []);

  const selectLength = (e) => {
    localStorage.setItem("length", e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({ articleUrl: article.url });

    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticle];
      setArticle(newArticle);
      setAllArticle(updatedAllArticles);

      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);

    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  return (
    <section className="mt-16 w-full max-w-xl">
      <div className="flex flex-col w-full gap-2">
        <form
          onSubmit={handleSubmit}
          className="relative flex justify-center items-center"
        >
          <img
            src={linkIcon}
            alt="Link Icon"
            className="absolute left-0 my-2 ml-3 w-5"
          />
          <input
            type="url"
            placeholder={t("input_placeholder")}
            required
            className="url_input peer"
            value={article.url}
            onChange={(e) =>
              setArticle({
                ...article,
                url: e.target.value,
              })
            }
          />
          <button
            type="submit"
            className="submit_btn peer-focus:border-gray-700
            peer-focus:text-gray-700"
          >
            ↩
          </button>
        </form>
        <label className="text-sm font-satoshi font-bold ">
          Length in paragraphs. This parameter might be ignored for a very long
          articles.
        </label>
        <select
          className="bg-white border border-gray-200
             text-[#3E3D40] text-sm font-semibold h-10"
          onChange={selectLength}
        >
          <option key="3" value={3}>
            3
          </option>
          <option key="4" value={4}>
            4
          </option>
          <option key="5" value={5}>
            5
          </option>
          <option key="6" value={6}>
            6
          </option>
        </select>
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticle.length > 0 && (
            <h2 className="font-satoshi font-bold  text-lg">
              Previous Searches
            </h2>
          )}
          {allArticle.map((item, index) => (
            <div
              key={index}
              onClick={() => setArticle(item)}
              className="link_card"
            >
              <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                <img
                  src={copied === item.url ? tick : copy}
                  alt="copy icon"
                  className="w-[40%] h-[40%] object-contain"
                />
              </div>
              <p
                className="flex-1 font-satoshi text-blue-700 font-medium text-sm
              truncate"
              >
                {item.url}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Display Results */}
      <div className="my-10 max-w-full flex justify-center items-center">
        {isFetching ? (
          <div>
            <img
              src={logoPng}
              alt="loader"
              className="w-10 h-10 animate-bounce"
            />
          </div>
        ) : error ? (
          <p className="font-inter font-bold text-black text-center">
            Error fetching the summary... <br />
            <span className="font-satoshi font-normal text-gray-700">
              {error.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                Article <span className="blue_gradient">Summary</span>
              </h2>
              <div className="summary_box">
                <p className="font-inter font-medium text-sm text-gray-700">
                  {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Demo;
