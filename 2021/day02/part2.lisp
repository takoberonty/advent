; part 2

(defvar aim 0)
(defvar x 0)
(defvar y 0)
(defvar n 0)
(handler-case
    (loop
        (case (read)
            (DOWN (setq aim (+ aim (read))))
            (UP (setq aim (- aim (read))))
            (FORWARD
                (setq n (read))
                (setq x (+ x n))
                (setq y (+ y (* aim n)))
            )
        )
    )
    (error (c))
)
(fresh-line)(write (* x y))