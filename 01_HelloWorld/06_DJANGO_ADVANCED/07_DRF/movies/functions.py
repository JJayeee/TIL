import bs4
import requests
from .models import Movie, Rating, Genre
from .views import get_object_or_404


def get_theater(theatercode):
    theatercodes = ['0056', '0001', '0229', '0010', '0063', '0252', '0230', '0009', '0105', '0011', '0057', '0030', '0046', '0300', '0088', '0276', '0150', '0040', '0112', '0059', '0074', '0013', '0131', '0199', '0107', '0223', '0164', '0191']
    total_theater_time_table = {}
    # for theatercode in theatercodes:
    URL = f'http://www.cgv.co.kr/common/showtimes/iframeTheater.aspx?areacode=01&theatercode={theatercode}&date=20191124'
    cgv_html = requests.get(URL).text
    cgv_soup =  bs4.BeautifulSoup(cgv_html, 'html.parser')

    total_timetable = {}
    movie_info = cgv_soup.select('.sect-showtimes .col-times')
    for movie in movie_info:
        title = str(movie.select('.info-movie strong')).split('<strong>')[1].split('</strong>')[0].replace(' ', '').replace('\r\n', '')
        time = movie.select('.info-timetable li a')
        temp = []
        for t in time:
            temp.append(t.text.split('잔여좌석'))
        total_timetable[title] = temp
    total_theater_time_table[theatercode] = total_timetable

    return total_theater_time_table


def make_genre_movies(user_id):
    ratings = Rating.objects.filter(user=user_id)
    idxList = [0 for _ in range(1, 21)]
    for rating in ratings:
        if rating.score > 3:
            for g in rating.movie.genre.all():
                idxList[g.id] += 1
    idx = idxList.index(max(idxList))

    movies = Movie.objects.filter(genre=idx).order_by("naverRating")[:15]
    dataset = []
    genre = get_object_or_404(Genre, id=idx)
    dataset.append({"genreName": genre.name})
    for movie in movies:
        if Rating.objects.filter(user=user_id, movie=movie.id).exists():
            continue
        d = {
            "id": movie.id,
            "name": movie.movieName,
            "posterUrl": movie.posterUrl,
        }
        dataset.append(d)
    return dataset



def make_users_top_movies(user_id):
    dataset = []
    movies = Movie.objects.order_by("-naverRating")[:30]

    for movie in movies:
        if Rating.objects.filter(user=user_id, movie=movie.id).exists():
            continue
        d = {
            "id": movie.id,
            "name": movie.movieName,
            "posterUrl": movie.posterUrl,
        }
        dataset.append(d)
        if len(dataset) == 15: break

    return dataset



def make_discounted_movies():
    pass


def make_user_sim_movies():
    pass


def make_movie_sim_movies():
    pass